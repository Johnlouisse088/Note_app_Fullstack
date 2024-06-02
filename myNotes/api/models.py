from django.db import models


class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)  # set the field to now every time the object is updated
    created = models.DateTimeField(auto_now_add=True)  # Automatically set to now when the object is first created

    def __str__(self):
        return self.body[:50]


