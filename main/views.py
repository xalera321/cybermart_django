from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Product
def index(request):
    return render(request, 'cybermart/index.html')

def catalog(request):
    return render(request, 'cybermart/catalog.html')

def about_company(request):
    return render(request, 'cybermart/about_company.html')

def contacts(request):
    return render(request, 'cybermart/contacts.html')

def HomePage(request):
    return render(request, 'cybermart/home.html')

def SignupPage(request):
    if request.method=='POST':
        uname = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')

        if pass1 != pass2:
            return HttpResponse("Ваши пароли не совпадают!")
        else:

            my_user = User.objects.create_user(uname, email, pass1)
            my_user.save()
            return redirect('login')

    return render(request, 'cybermart/signup.html')

def LoginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        pass1 = request.POST.get('pass')
        user = authenticate(request, username=username, password=pass1)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return HttpResponse("Имя или пароль некоректны!")

    return render(request, 'cybermart/login.html')

def LogoutPage(request):
    logout(request)
    return redirect('login')

def catalog(request):
    products = Product.objects.all()
    return render(request, 'cybermart/catalog.html', {'products': products})