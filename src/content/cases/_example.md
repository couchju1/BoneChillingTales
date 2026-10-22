---
# EXAMPLE ONLY. Every name, place, date and number here is made up.
# draft: true keeps it off the site. Copy this file to start a real story.
# Preview it with `npm run dev`, then open /cases/_example/.
draft: true
title: "What happened to Example Person?"
seoTitle: "Example Person: What Happened in Example Town, SD"
description: "A made-up case that shows the story file format. It is never published."
person: "Example Person"
summary: "Example Person left work in Example Town on June 12, 1987, and was never seen again. [S1] No one has been charged. The sheriff's office still lists the case as open. [S2]"
status: missing
town: "Example Town"
state: SD
incidentDate: 1987-06-12
lastSeenDate: 1987-06-12
resolvedDate: null
lastChecked: 2026-10-08
lastFactChange: null
published: 2026-10-20
agency: "the Example County Sheriff's Office"
tipLine: "+16055550100"
anonymousTips: { name: "Example Crime Stoppers", url: "https://example.com/tips" }
contentNote: null # finishes "this story describes ___", like "violence against a child"
image:
  src: "./_example-portrait.jpg"
  alt: "Example Person in an undated photo released by the Example County Sheriff's Office"
  credit: "Photo released by the Example County Sheriff's Office"
  license: "Released to the press by the agency, 1987"
youtubeId: null
youtubeUploadDate: null # the day the video went up, like 2026-10-20
# Missing cases only: the poster facts shown above the story. Leave out anything the agency didn't release.
poster:
  - { label: "Age then", text: "26 [S2]" }
  - { label: "Height", text: "5 feet 9 [S2]" }
  - { label: "Last place", text: "The feed store in Example Town [S1]" }
# The one question for readers. Shown after the story, so the story can end on a fact.
readerQuestion: "Someone on that road may have seen a car that night. What would it take for them to come forward?"
sources:
  - { id: S1, title: "Example press release", publisher: "Example County Sheriff's Office", url: "https://example.com/release", date: 1987-06-20 }
  - { id: S2, title: "Example missing person entry", publisher: "Example state database", url: "https://example.com/entry", date: 2020-01-01 }
  - { id: S3, title: "Example newspaper report", publisher: "Example Daily", url: "https://example.com/article", date: 1987-06-15, archive: "https://web.archive.org/web/2026/https://example.com/article" }
timeline:
  - { date: 1961, text: "Example Person is born in Example Town. [S3]", section: "who-they-were" }
  - { date: 1987-06-12, text: "Leaves work at the feed store around 9 p.m. [S1]", section: "the-last-night" }
  - { date: 1987-06-14, text: "Family reports them missing. [S1]", section: "the-search" }
  - { date: 1987-07, text: "Volunteers search the river bottoms. [S3]", section: "the-search" }
  - { date: 2020-01-01, text: "Case added to the state missing persons list. [S2]", section: "the-search" }
updates:
  - { date: 2026-10-20, text: "Story published." }
  - { date: 2026-11-02, text: "The sheriff's office confirmed the case is still open. [S2]" }
---

A coworker watched Example Person leave the feed store around 9 p.m. on June 12, 1987. [S1]

## Who they were

Example Person worked at a feed store and coached a youth baseball team. They grew up on a farm south of town and moved back after a few years away. [S3]

## The last night

They were last seen leaving work that night. A coworker said they planned to drive straight home. [S1, S2]

## The search

Their family called the sheriff two days later. [S1] Volunteers searched the river bottoms that July. [S3]

The sheriff's office still lists the case as open. [S2]
