---
title: .NET Core 1.0 Not Ready for Primetime
author: Joseph Bales
date: 2017-01-13
---

`<rant>`

Well, I just spent two hours of my life getting a project running that was already working on another PC. I'm so fed up right now that I don't really want to work on the actual project. It is an ASP.NET Core 1.0 project that I've been working on a few minutes at a time for the past couple of months. I've made so little progress that when I started running into trouble I thought about just creating a new project from scratch and copying over the files. But without a guarantee that the new project would work I decided that was not a very good solution.

It's actually been a few months since I've messed with the project. It builds and runs on my laptop, but I just built a new desktop computer and I have been doing most of my work on it, so I wanted to get the project going. I cloned it to the machine, restored the packages, and immediately ran into problems.

The first thing I ran into was that the .Net Core SDK doesn't get installed with Visual Studio 2015, mmmmkay. I installed that. Then the project won't build. Turns out there were some new packages I needed that didn't get included in my project.json, so I added those. Mind you this is the same project.json file that worked fine on my laptop. Then I spent several minutes figuring out how to get the `dotnet user-secrets` command working. This one was also a missing reference in my project.json. This also didn't work on the laptop although it must have at some point in the past, otherwise I would not have been able to add my secret keys to it.

I re-ran across the problem where if you are running the project with IIS Express and SSL in debugging mode, it won't work until you create the self-signed certificate. It doesn't throw an error or anything, the page just never loads. Using CTRL+F5 to start the project will get the pop-up you need to create the cert.

Finally, I ran across a bug where EF migrations can't deal with the boilerplate code created for use with Microsoft Identity. I had to go in and manually edit the migration code to give some fields maxlengths so that they could be used as indexes. Crazy.

So far my experience with .NET Core has just been one thing after another like this. The tooling is standing in the way of my coding. Honestly I'm not even sure why they released .NET Core 1.0 while the tooling was still officially in preview. I mean, the tooling is still in preview 3 months later and still seems to need some work.

I like the ideas behind .NET Core, but I'm thinking it has been a bit rushed. One of the things that really sets the Microsoft stack apart from others is how solid and cohesive it has been. I hope they can pull this shit together and get it shored up in the next few months.

Also, while I'm ranting about Microsoft products, let me just say that their sculpt keyboard and mouse combo is not great. You can check out my review at [this link](https://www.amazon.com/gp/customer-reviews/R207405EDO9X04?ref_=cm_cr_arp_d_rvw_ttl&ASIN=B00CYX53QW&pldnSite=1).

`</rant>`
