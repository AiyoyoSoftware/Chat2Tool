---
title: Sauce Generator
slug: sauce-generator
theme: recipe
layout: tool
description: Generate low-calorie sauce ideas
state:
  base: yogurt
data:
  sauces: /data/sauces.json
computed:
  matching: sauces | where("base", base)
meta:
  tags: [recipes, sauces, tool]
  published: true
  accent: olive
---

# Sauce Generator

Choose a base and get quick matches from local JSON.

@#select bind="base" options="yogurt,soy" label="Choose a base"

## Matching sauces

@#if matching
@#for item in matching
- {{ item.name }}
@#endfor
@#endif

@#callout type="info" title="Starter formula"
Use yogurt + acid + one savory flavor.
@#endcallout
