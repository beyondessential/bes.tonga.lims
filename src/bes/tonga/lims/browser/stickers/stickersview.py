# -*- coding: utf-8 -*-
#
# This file is part of BES.TONGA.LIMS.
#
# BES.TONGA.LIMS is free software: you can redistribute it and/or modify it
# under the terms of the GNU General Public License as published by the Free
# Software Foundation, version 2.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this program; if not, write to the Free Software Foundation, Inc., 51
# Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
#
# Copyright 2024-2025 by it's authors.
# Some rights reserved, see README and LICENSE.

from bes.tonga.lims import utils
from senaite.core.browser.stickers.view import StickerView


class StickersDefaultView(StickerView):
    """Product-specific controller view for stickers/labels
    """

    def long_date(self, date):
        """Returns the localized date in long format
        """
        return utils.to_localized_time(date, long_format=1)

    def short_date(self, date):
        """Returns the localized date in short format
        """
        return utils.to_localized_time(date, long_format=0)
