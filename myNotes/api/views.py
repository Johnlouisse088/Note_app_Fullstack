from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NotesSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by("-updated")   # For descending order of note base on updated date
    serializer = NotesSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request, id):
    note = Note.objects.get(id=id)
    serializer = NotesSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createNote(request):
    serialiazer = NotesSerializer(data=request.data)
    if serialiazer.is_valid():
        serialiazer.save()
    return Response(serialiazer.data)



@api_view(['PUT'])
def updateNote(request, id):
    data = request.data
    note = Note.objects.get(id=id)
    serializer = NotesSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        print("error")

    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request, id):
    note = Note.objects.get(id=id)
    note.delete()
    return Response("Deleted...")

