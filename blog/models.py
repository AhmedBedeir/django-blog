from django.db import models
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField
from datetime import datetime    
from django.utils.timezone import now
# Create your models here.

class Article(models.Model):
  categoryList = [
        ("javascript" , "JavaScript"),
        ("web develpment" , "Web Develpment"),
        ("react" , "React"),
        ("python" , "Python"),
        ("other", "Other"),
    ]
  owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
  title = models.CharField(max_length = 200)
  desc = models.CharField(max_length = 200)
  artImage = models.ImageField(upload_to = 'art_photos', default = './images/default.jpg', null = True, blank = True)
  content = models.TextField()
  category = MultiSelectField(choices=categoryList,  max_choices=3)
  created = models.DateTimeField(default=now, editable=False) 
  bookmarks = models.ManyToManyField(User, related_name='bookmarks')
  upvote = models.ManyToManyField(User, related_name='up')
  downvote = models.ManyToManyField(User, related_name='down')
  
  class Meta:
    ordering = ['-created']
  def  __str__(self):
    return f'{self.owner} writes an article at {self.created}'
  
class Comment(models.Model):
  owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
  article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name = 'article')
  created = models.DateTimeField(default=now, editable=False)
  content = models.TextField(max_length = 200)
  class Meta:
    ordering = ['-created']
  def __str__(self):
    return f"{self.owner} write a comment at {self.created}"