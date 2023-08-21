# -*- coding: utf-8 -*-
#
# This file is part of PALAU.LIMS
#
# Copyright 2023 Beyond Essential Systems Pty Ltd

from archetypes.schemaextender.interfaces import IBrowserLayerAwareExtender
from archetypes.schemaextender.interfaces import IOrderableSchemaExtender
from archetypes.schemaextender.interfaces import ISchemaModifier
from bika.lims.browser.widgets import SelectionWidget
from bika.lims.browser.widgets import DateTimeWidget
from bika.lims.interfaces import IAnalysisRequest
from palau.lims import messageFactory as _
from palau.lims.browser.widgets import BottlesWidget
from palau.lims.browser.widgets import ReferenceOtherWidget
from palau.lims.config import LOCATIONS
from palau.lims.config import SAMPLE_FIELDS_ORDER
from palau.lims.content import disable_field
from palau.lims.content import update_field
from palau.lims.content.fields import ExtRecordsField
from palau.lims.content.fields import ExtStringField
from palau.lims.content.fields import ExtUIDReferenceField
from palau.lims.content.fields import ExtUIDReferenceOtherField
from palau.lims.content.fields import ExtDateTimeField
from palau.lims.interfaces import IPalauLimsLayer
from palau.lims.permissions import FieldEditBottles
from palau.lims.permissions import FieldEditClinicalInformation
from palau.lims.permissions import FieldEditCurrentAntibiotics
from palau.lims.permissions import FieldEditLocation
from palau.lims.permissions import FieldEditVolume
from palau.lims.permissions import FieldEditWard
from palau.lims.permissions import FieldEditWardDepartment
from palau.lims.permissions import FieldEditDateOfAdmission
from palau.lims.validators import SampleVolumeValidator
from Products.Archetypes.Widget import StringWidget
from Products.CMFCore.permissions import View
from senaite.core.browser.widgets import ReferenceWidget
from senaite.core.catalog import SETUP_CATALOG
from zope.component import adapts
from zope.interface import implementer

# A list with the names of the fields to be disabled
DISABLED_FIELDS = [
    "ClientOrderNumber",
    "ClientReference",
    "ClientSampleID",
    "Composite",
    "Invoice",
    "InvoiceExclude",
    "MemberDiscount",
    "Preservation",
    "PublicationSpecification",
    "SampleCondition",
    "SamplingDeviation",
    "StorageLocation",
    "SubGroup",
]

# A tuple with (field_name, properties), where properties is a dict
UPDATED_FIELDS = [
    ("Client", {
        "widget": {
            "label": _("Hospital/Clinic"),
            "description": "",
        }
    }),
    ("Contact",  {
        "widget": {
            "label": _("Doctor"),
            "description": "",
        }
    }),
    ("DateSampled",  {
        "widget": {
            "description": "",
        }
    }),
    ("Template",  {
        "widget": {
            "description": "",
        }
    }),
    ("Profiles",  {
        "widget": {
            "description": "",
        }
    }),
    ("Remarks",  {
        "widget": {
            "description": "",
        }
    }),
    ("Container", {
        "widget": {
            "size": 20,
        }
    }),
    ("Preservation", {
        "widget": {
            "size": 20,
        }
    }),
    ("EnvironmentalConditions", {
        "widget": {
            "label": _("Site additional information"),
            "description": "",
            "visible": {
                "add": "edit"
            }
        }
    }),
    ("Sex", {
       "required": True
    }),
    ("SamplePoint", {
        "widget": {
            "label": _("Site"),
        }
    })
]

# Additional fields for Sample (aka AnalysisRequest)
NEW_FIELDS = [
    ExtUIDReferenceField(
        "Ward",
        allowed_types=("Ward", ),
        required=True,
        multiValued=False,
        read_permission=View,
        write_permission=FieldEditWard,
        widget=ReferenceWidget(
            label=_("Ward"),
            render_own_label=True,
            size=20,
            visible={
                'add': 'edit',
                'secondary': 'disabled',
                'header_table': 'prominent',
            },
            catalog_name=SETUP_CATALOG,
            base_query={'is_active': True,
                        "sort_on": "sortable_title",
                        "sort_order": "ascending"},
            showOn=True,
        )
    ),

    ExtRecordsField(
        "Bottles",
        minimalSize=1,
        fixedSize=False,
        read_permission=View,
        write_permission=FieldEditBottles,
        type="records",
        subfields=(
            "Container",
            "Identifier",
            "Weight",
            "Volume",
            "DryWeight",
            "container_uid",
        ),
        subfield_labels={
            "Container": _("Bottle"),
            "Identifier": _("Identifier"),
            "Weight": _("Weight (g)"),
            "Volume": _("Volume (ml)"),
        },
        subfield_sizes={
            "Container": 20,
            "Identifier": 10,
            "Weight": 3,
            "Volume": 3,
        },
        subfield_types={
            "Weight": "float",
        },
        subfield_hidden={
            "container_uid": True,
            "DryWeight": True,
        },
        subfield_readonly={
            "Volume": True,
        },
        required_subfields={
            "Container",
            "Identifier",
            "Weight",
        },
        default=[{
            "Container": "",
            "Identifier": "",
            "Weight": "",
            "Volume": "",
            "container_uid": "",
            "DryWeight": "",
        }],
        widget=BottlesWidget(
            label=_("Bottles"),
            allowDelete=True,
            visible={"add": "edit"},
            render_own_label=True,
            combogrid_options={
                "Container": {
                    "colModel": [
                        {
                            "columnName": "Container",
                            "label": _("Bottle"),
                            "width": "20",
                            "align": "left",
                        }, {
                            "columnName": "Description",
                            "label": _("Description"),
                            "width": "30",
                        }, {
                            "columnName": "DryWeight",
                            "hidden": True,
                        }, {
                            "columnName": "container_uid",
                            "hidden": True
                        },
                    ],
                    "url": "get_bottles",
                    "showOn": True,
                    "width": "550px"
                }
            }
        ),
    ),

    ExtUIDReferenceOtherField(
        "ClinicalInformation",
        allowed_types=("ClinicalInformation",),
        multiValued=True,
        read_permission=View,
        write_permission=FieldEditClinicalInformation,
        widget=ReferenceOtherWidget(
            label=_("Relevant clinical information"),
            render_own_label=True,
            size=20,
            visible={
                'add': 'edit',
            },
            catalog_name=SETUP_CATALOG,
            base_query={
                "is_active": True,
                "sort_on": "sortable_title",
                "sort_order": "ascending",
            },
            showOn=True,
        )
    ),

    ExtDateTimeField(
        "DateOfAdmission",
        mode="rw",
        read_permission=View,
        write_permission=FieldEditDateOfAdmission,
        widget=DateTimeWidget(
            label=_("Date of Admission"),
            size=20,
            show_time=True,
            datepicker_nofuture=True,
            visible={
                'add': 'edit',
                'secondary': 'disabled',
                'header_table': 'prominent',
            },
            render_own_label=True,
        ),
    ),

    ExtUIDReferenceField(
        "CurrentAntibiotics",
        allowed_types=("Antibiotic", ),
        multiValued=True,
        read_permission=View,
        write_permission=FieldEditCurrentAntibiotics,
        widget=ReferenceWidget(
            label=_("Current antibiotic(s)"),
            render_own_label=True,
            size=20,
            visible={
                'add': 'edit',
            },
            catalog_name=SETUP_CATALOG,
            base_query={
                "is_active": True,
                "sort_on": "sortable_title",
                "sort_order": "ascending",
            },
            showOn=True,
        )
    ),

    ExtStringField(
        "Volume",
        required=False,
        validators=SampleVolumeValidator(),
        read_permission=View,
        write_permission=FieldEditVolume,
        widget=StringWidget(
            render_own_label=True,
            size=20,
            label=_("Volume"),
            description=_(
                "Volume of sample, expressed as quantity and unit (e.g '10 ml')"
            ),
            visible={
                'add': 'edit',
            }
        )
    ),

    ExtUIDReferenceField(
        "WardDepartment",
        allowed_types=("WardDepartment", ),
        required=True,
        multiValued=False,
        read_permission=View,
        write_permission=FieldEditWardDepartment,
        widget=ReferenceWidget(
            label=_("Department"),
            render_own_label=True,
            size=20,
            visible={
                'add': 'edit',
                'secondary': 'disabled',
                'header_table': 'prominent',
            },
            catalog_name=SETUP_CATALOG,
            base_query={'is_active': True,
                        "sort_on": "sortable_title",
                        "sort_order": "ascending"},
            showOn=True,
        )
    ),

    ExtStringField(
        "Location",
        required=True,
        default="",
        vocabulary=LOCATIONS,
        mode='rw',
        read_permission=View,
        write_permission=FieldEditLocation,
        widget=SelectionWidget(
            label=_("Location"),
            format="select",
            visible={
                "add": "edit",
            }
        ),
    ),

]


@implementer(IOrderableSchemaExtender, IBrowserLayerAwareExtender)
class AnalysisRequestSchemaExtender(object):
    """Extends the Sample (aka AnalysisRequest) with additional fields
    """
    adapts(IAnalysisRequest)
    layer = IPalauLimsLayer

    def __init__(self, context):
        self.context = context

    def getOrder(self, schematas):  # noqa CamelCase
        # Order the Sample fields accordingly
        prev_idx = -1
        for field_id in SAMPLE_FIELDS_ORDER:
            sch = schematas["default"]
            if field_id not in sch:
                continue

            idx = sch.index(field_id)
            if idx < prev_idx:
                del(sch[idx])
                # Three-column layout in Sample's table view!
                prev_idx += 3
                sch.insert(prev_idx, field_id)
            else:
                prev_idx = idx

        return schematas

    def getFields(self):  # noqa CamelCase
        return NEW_FIELDS


@implementer(ISchemaModifier, IBrowserLayerAwareExtender)
class AnalysisRequestSchemaModifier(object):
    adapts(IAnalysisRequest)
    layer = IPalauLimsLayer

    def __init__(self, context):
        self.context = context

    def fiddle(self, schema):
        # Disable some of the fields
        map(lambda f: disable_field(schema, f), DISABLED_FIELDS)

        # Update some fields (title, description, etc.)
        map(lambda f: update_field(schema, f[0], f[1]), UPDATED_FIELDS)

        return schema
