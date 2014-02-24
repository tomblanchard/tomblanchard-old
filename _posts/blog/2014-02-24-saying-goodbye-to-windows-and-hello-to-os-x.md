---
layout:   "single-blog-post"
category: "blog"

title:    "Saying goodbye to Windows and hello to OS X"

image:    "saying-goodbye-to-windows-and-hello-to-os-x.jpg"

excerpt:  ""
---

Ever since I started out as a front-end developer I've worked on a PC running Windows, it's served me well over the years, despite all the issues that most people in this industry seem to have with the Windows operating system I don't really have anything to complain about.

I spent a long time mulling over whether or not I was going to join the Apple bandwagon and get a Mac. Well around a month ago I took the plunge and purchased a 13.3-inch MacBook Air and I couldn't be happier with it, I've waited a few weeks to see if this purchase has turned out to be a good investment and it definitely has. The only thing that's caused some problems is transitioning from Windows to OS X which I fully anticipated considering this is my **first** ever Mac.

## Apps

As I'm explicitly a front-end dev it was a breeze setting up the machine for work purposes, as my requirements are very lean. It was just a case of installing all the CLI tools I use (Git, Node, Ruby, Grunt etc.), installing software (Photoshop, Skype etc.) then leaving my Dropbox to download all of my files and boom, ready to <del>twerk</del> work! There were a couple of Windows-only apps I had to sacrifice but it didn't take long to find OS X alternatives, all together, the setting up process was mostly painless.

For a while I've gotten into the habit of using Dropbox for pretty much everything, this includes hosting of my app data, so it's easy to have the same software settings / plugins synced across different machines. I do this mostly for 1Password (all of my login details, encrypted of course), Sublime Text (all settings and packages) and XAMPP (web project files which require a local Apache / SQL server to run). I'm so glad I got everything synced on Dropbox prior to upgrading my work machine, it saved a lot of headaches and it's so efficient because I can pretty much work from any machine (given an hour or two to set it up).

### Internet Explorer

Just when I thought I was done for good with Windows... It turns out the best way to run IE on Mac machines is through installing virtual machines that run the Windows operating system. This was a bit of a drag to set up due to the huge file sizes of the virtual machine files from [Modern.IE](http://modern.ie) and my not-so-great Internet speed but once everything is set up it's pretty painless to test in IE, plus it's kind of cool to see Windows actually running **inside** of OS X.

## Portability

Not only is this my first Mac work machine, it's also my first portable work machine, I've only ever worked on fixed desktop PCs. Most of the time I work with my MacBook connected to a 24-inch monitor but sometimes it's nice to have a change the surroundings where I work from, I've found it makes me a lot more productive compared to staying in the same place for hours on end.

## Downsides

Though the transition from Windows to OS X has been *mostly* effortless I have come across a few things that I'm not a huge fan of.

### Archives

With Windows, the native way to handle `.zip` archive files is quite seamless; it just opens like a native directory. With OS X, when you open one it automatically extracts all the file contents into its own directory in the same directory as the `.zip` file. This really bugs me; it causes unnecessary clutter and doesn't feel graceful at all. I've tried a few custom OS X archive GUI apps but none seem to function as seamless as I prefer, this isn't a huge deal and I'm sure I'll get used to it.

### .DS_Store

This thing drives me crazy, basically OS X comes with a built in app called "Finder", and it's for navigating around files on the machine's hard drive. Every time you open a directory Finder automatically generates a hidden `.DS_Store` file which holds meta data about the directory, if you delete it, it comes straight back. You might not think this is a big deal but when you have it so hidden files are visible it get's hugely annoying. It means I have to exclude that file from all directories when working with Git (using `.gitignore`), it also means that if I upload an entire directory via FTP (which is sometimes needed), all those annoying `.DS_Store` files come with it.

### Other little things

Other things that I've noticed I don't like about OS X are quirks I've grown accustomed to while working on Windows machines all of my life. One thing is that you can't quickly permanently delete files / directories, in Windows it's a simple keyboard shortcut `shift + del`, but in OS X you have to move the file to Trash then empty the Trash which gets old fast. Another thing I grew fond of in Windows was right clicking in a directory and being able to create a new file there and then, mostly I'd use this when creating new `.html` / `.css` files, you can't do this in OS X either, I know it's a very small thing but when you're so used to doing it you grow to miss it.

## Conclusion

In the end though I'm smitten for this MacBook and OS X, it's significantly faster than my old Windows machine and a lot more fun to work with. I've always been a lover of Apple, I've had this machine for a few weeks now and I still get blown away with even it's external appearance, the attention to detail Apple put into their products is phenomenal.

This upgrade has made my job easier and a lot more enjoyable, if you're reading this (people read this right?) and are wanting to get a Mac but are worried about switching from Windows to OS X, don't be... do it, do it now!