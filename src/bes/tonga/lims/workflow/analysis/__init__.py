# -*- coding: utf-8 -*-
#
# This file is part of BES.tonga.LIMS
#
# Copyright 2024 Beyond Essential Systems Pty Ltd

from bes.tonga.lims.workflow.analysis import events


def AfterTransitionEventHandler(analysis, event):  # noqa camelcase
    """Actions to be done when a transition for an analysis takes place
    """
    if not event.transition:
        return

    function_name = "after_{}".format(event.transition.id)
    if hasattr(events, function_name):
        # Call the after_* function from events package
        getattr(events, function_name)(analysis)
