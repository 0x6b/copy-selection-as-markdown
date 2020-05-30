## 9\. Shadows, Fade-in/out menus, and more fancy stuff

  

### 9.1 Shadows and Fading menus

If you thought that drop shadows, fading menus and true transparency were only possible in heavyweight desktop environments, here is a surprise. All of this is possible in Openbox (provided your hardware supports it – check [this thread](http://ubuntuforums.org/showthread.php?t=75527) first) when you use [xcompmgr](http://packages.ubuntu.com/hardy/xcompmgr). Here is how you do it:

Install xcompmgr through Synaptic or apt:

	sudo aptitude install xcompmgr

Enable compositing in your Xorg file. Open a terminal and open the Xorg file:

	sudo your\_text\_editor /etc/X11/xorg.conf

and add the following to the end of the file:

	Section "Extensions"
		Option "Composite" "Enable"
	EndSection

Save and close the file. You’ll now have to restart X (the graphical environment). Make sure you have everything saved that is still open, and press Ctrl+Alt+Backspace. You will be back at your login screen. Once you are back in Openbox, you can start using xcompmgr. You have plenty of options to experiment with. Have a look at [jdong’s thread](http://ubuntuforums.org/showthread.php?t=75527) about xcompmgr on the Ubuntuforums; you’ll find it very useful in finding the right xcompmgr settings for you (drop shadows, acceleration, fading menus, etc.).I prefer the following settings, which only displays drop shadows:
