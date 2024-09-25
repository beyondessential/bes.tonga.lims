# -*- coding: utf-8 -*-
#
# This file is part of BES.tonga.LIMS
#
# Copyright 2024 Beyond Essential Systems Pty Ltd

from bes.tonga.lims.reflex import handle_reflex_testing


def after_submit(analysis):
    """Event fired when an analysis result gets submitted
    """
    # Handle reflex testing if necessary
    handle_reflex_testing(analysis, "submit")


def after_verify(analysis):
    """Event fired when an analysis result gets submitted
    """
    # Handle reflex testing if necessary
    handle_reflex_testing(analysis, "verify")
