from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.contrib.auth import login, authenticate
from django.urls import reverse
from .forms import UserForm

# Create your views here.
def register(request):
  if request.method == 'POST':
    form = UserCreationForm(request.POST)
    if form.is_valid():
      user = form.save()
      login(request, user)
      return redirect('/')
  else:
    form = UserCreationForm()
  return render(request, 'registration/register.html', {
    'form': form
  })