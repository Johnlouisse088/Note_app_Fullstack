from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('routes/', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/<int:id>/', views.getNote, name="note"),
    path('notes/create/', views.createNote, name="create"),
    path('notes/update/<int:id>/', views.updateNote, name="update"),
    path('notes/delete/<int:id>/', views.deleteNote, name="delete"),
]