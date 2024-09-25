# -*- coding: utf-8 -*-
#
# This file is part of BES.tonga.LIMS
#
# Copyright 2024 Beyond Essential Systems Pty Ltd

from bes.lims.interfaces import IBESLimsLayer


class IBesTongaLimsLayer(IBESLimsLayer):
    """Zope 3 browser Layer interface specific for bes.tonga.lims
    This interface is referred in profiles/default/browserlayer.xml.
    All views and viewlets register against this layer will appear in the site
    only when the add-on installer has been run.
    """
