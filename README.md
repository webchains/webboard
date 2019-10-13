# Webboard

Webboard is the optional front-end ui for the Webpost backend. Webpost is kind of like a p2p chan site. when a user makes a post, that post gets sent to every server in the network. Webboard is the ui that makes it easy to interact with a node of the Webpost network.

To configure Webboard to you liking, use the .env file to set up the front-end

here are the options

VUE_APP_SERVERS=domain1,domain2 -> the domains of the webpost servers, comma seperated if more than one
VUE_APP_NODES=domain1,domain2 -> the domains of the webcoin nodes, comma seperated if more than one
VUE_APP_SITE=name -> name of this front-end, what you want to call this site/app
VUE_APP_STAMP=some text that will go on the bottom of the pages
VUE_APP_SERVER=ignore -> ignore this for now
VUE_APP_NODE=ignore -> ignore this for now