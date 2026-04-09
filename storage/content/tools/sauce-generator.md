---
title: Sauce Generator
slug: sauce-generator
theme: recipe
layout: tool
description: Explore sauces with persisted controls and reusable result cards
state:
  base: yogurt
  view: cards
  query: ""
  heat: 3
  showTips: true
data:
  sauces: /data/sauces.json
computed:
  matching: sauces | where("base", base) | sort("name")
  names: matching | pluck("name") | join(", ")
meta:
  tags: [recipes, sauces, tool]
  published: true
  accent: olive
  persist: [base, view, query, heat]
---

# Sauce Generator

Pick a base, switch layouts, and preview a more capable one-page app contract.

@#define name="sauce-card"
### {{ item.name }}
- Base: {{ item.base }}
- Heat: {{ item.heat }}
- Calories: {{ item.calories }}
@#enddefine

@#select bind="base" options="yogurt,soy" label="Choose a base" url="true"
@#radio bind="view" options="cards,list" label="View"
@#input bind="query" label="Notes query" match="^[A-Za-z ]*$" placeholder="Letters only"
@#range bind="heat" label="Heat target" min="1" max="5" step="1"
@#toggle bind="showTips" label="Show tip"
@#button label="Card view" set="view=cards"
@#button label="List view" set="view=list"
@#button label="Reset filters" reset="base,view,query,heat"
@#button label="Copy names" copy="names"

@#if showTips
@#callout type="info" title="Starter formula"
Use yogurt + acid + one savory flavor.
@#endcallout
@#endif

@#if invalid("query")
@#callout type="warning" title="Query format"
Use letters and spaces only in the notes query field.
@#endcallout
@#endif

## Matching sauces

@#empty matching
No sauces currently match {{ base }}.
@#endempty

@#if matching and view == "cards"
@#for item in matching
@#use sauce-card with="item=item"
@#endfor
@#else
@#json-list source="matching" field="name"
@#endif
