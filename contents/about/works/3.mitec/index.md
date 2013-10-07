---
title: MIT Energy Club
slug: mitec
thumbnail: mitec-thumb.png
feature:
- view: mitec-medium.png
  full: mitec.png
  caption: ""
- view: mitec2-medium.png
  full: mitec2.png
  caption: "Integration with EnergyFolks API for content"
- view: mitec3-medium.png
  full: mitec3.png
  caption: "The users should at least be able to view the content comfortably on a smaller screen"
---
This project was done for MIT Energy Club to help relaunch their program with better integration with [Energy Folks](https://www.energyfolks.com), a national network of students and professionals passionate about energy.

#### Integration as the key
The biggest challenge in implementing this WordPress site is integrating content with the EnergyFolks API. This API supplies events calendar, job postings, blog posts and member listings that are specific to the MIT Energy Club branch. To best incorporate the content provided by EnergyFolks into the original look and feel of the site, I maintain regular communication with the API developer throughout the development process. Human collaboration is very much key in this highly computerized industry.

#### Flex your responsive muscle
When I start the development process, the Photoshop comps are only made for a standard, 1000px desktop design. Not convinced that a new site being built today should only cater to desktop users, I decide to go out of my way and build responsiveness into the final product. This is no easy feat, especially when the original style decisions are made with a fixed width in mind. What proves to be another difficulty is the content coming from EnergyFolks API having styles embeded in them, again with a fixed-width design intent. Building cohesive responsiveness to the site thus involves breaking down and refining design patterns to make them suitable for any screen size before putting them back together.

#### Back to the future
Working on this project gives me a deeper insight on how an API should be architected and implemented. With more powerful client-side technologies (templating engines, pre-processors, MVC frameworks etc.), the web is now better positioned than ever before to achieve greater separation between the roles of the server and the client. In order to create more scalable systems, we web developers need to learn how to make [more efficient yet simpler](http://www.restapitutorial.com/) web services. HTTP was originally designed to allow machines to communicate with each other through resources (data). As user devices get more powerful each day, it is time we leave the application logic and stylist decisions to the clients. While this is not a new concept, the average developer now has sufficient tools within their reach to make such an architecture viable even for small scale projects.