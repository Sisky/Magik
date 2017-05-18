from django.contrib import admin
from django.conf.urls import url, include
from rest_framework import routers

import booking.views as booking_views

router = routers.DefaultRouter()
router.register(r'booking', booking_views.BookingView)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
]
