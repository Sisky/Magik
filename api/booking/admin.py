from django.contrib import admin

import booking.models as booking_models

admin.site.register(booking_models.Booking)
