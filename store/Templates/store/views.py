from django.shortcuts import render

def store(request):
	context = {}
	return render(request, 'webpage/store.html', context)

def cart(request):
	context = {}
	return render(request, 'webpage/cart.html', context)

def checkout(request):
	context = {}
	return render(request, 'webpage/checkout.html', context)