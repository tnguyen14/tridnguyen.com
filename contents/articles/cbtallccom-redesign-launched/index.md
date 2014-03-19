---
title: cbtallc.com redesign launched!
author: tri-nguyen
date: 2014-03-18
template: article.hbs
---

I started working with Jim and CBTA LLC. on their website since 2010. In fact, it was the first ever WordPress site I built, marking the beginning of my web development career. It was the good old days of buying a standard theme (for $40 or so if I remember correctly) and then customizing it through ONE single custom stylesheet, inline styles and inline scripts. With all of that, I was able to create a homepage with carousel and a Google calendar page for appointment scheduling (see the screenshots attached). I was pretty proud of myself for this.

![Old Site Homepage](old_cbta-small.png)

![Old Site Appointment Page](old_cbta2-small.png)

Fast forward 3 years, the old way of using a paid theme of using inline styles and scripts became unsustainable as the practice's needs expanded. And while I have learned and grown so much more as a WordPress developer, having built many custom themes and functionalities, I felt that WordPress was an overkill for a site like cbtallc.com. The concept of a server-side architecture with database queries became clunky for a site that requires so many custom pages and functionalities yet few content iterations. I was responsible for updating few content changes, yet unable to implement new cool features. This is when I decided that a static-site generator would suit the needs of this page better.

Having just released [tobiko](https://github.com/tnguyen14/tobiko) and used it on this personal blog, I decided to use it to power cbtallc.com version 2 as well. Thus began a very exciting process for me of stripping a rather standard business-y site originally into a more modern and minimal looking site, preserving the original functionalities yet making it more open to new features. I wanted to reduce the number of pages a user has to click through to consume the information that matters to them. All of this while keeping the site as clutter-free as possible, keeping in mind the potential audience the site would attract. Last but not least, while the amount of mobile and tablet usage was low, I believe it was because the old site could not be as mobile-friendly as it should be. So the new site was developed with responsive design baked in from the start.

![New Site Homepage](new_cbta-small.png)

![New Site Appointment Page](new_cbta2-small.png)

Having said all that, I am not a designer by training, so I'm sure there are probably more design violations committed in the new site than legally allowed. But I think I am more okay with that, because the whole static-site architecture that tobiko provides allows the developer me to iterate quicker and make more frequent small improvements over time. This is actually what I am happiest about the new site - the new build process that is baked into it. I won't go into depth on the benefits of [tobiko](https://github.com/tnguyen14/tobiko) here, and there are plenty, but that's for another post.

The practice's appointment schedule system is improved with newer tools, including fullcalendar and Twitter Bootstrap modal. A user can now select an appointment request right from the calendar without typing in the date and time repeatedly as before. The new site also exposes information about therapists at the practice and treatments offered in a way that requires less friction from the users (fewer clicking and page refreshes), which hopefully will amount to a smoother overall experience. So there are also clear UX and content wins with the redesign as well, in addition to the behind-the-scene stuff.

There are certainly many areas the site can be better, including a cleaner, friendlier calendar display and deeper content engagement with the audience through blog posts (which is thankfully built in to tobiko). These challenges and improvements will definitely be worked on as I embrace a more agile approach in developing the site. As for these past couple weeks since the soft launch, I am pretty happy that a website that started it all for me gets a facelift and hopefully serves its users better. Check it out at http://www.cbtallc.com.