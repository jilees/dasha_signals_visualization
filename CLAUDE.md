# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web dashboard for analyzing and visualizing marketplace customer feedback signals for the **Dasha (ДАША)** TV set-top box product. The dashboard surfaces customer pains, barriers, and sentiment across the customer journey.

## Project Status

Early stage — data and UI mockups exist, no implementation yet. When building, choose a stack that fits the data (CSV → dashboard).

## Data

**`data/dasha.marketplace-feedbacks.csv`** — 1,139 reviews, UTF-8, Cyrillic text.

| Column | Description |
|---|---|
| `_id` | Unique review ID |
| `cons` / `pros` | Negatives/positives text |
| `comment` | Full review text |
| `aspect` | Specific product aspect discussed |
| `description` | Normalized aspect description |
| `mainTheme` | Primary customer journey stage |
| `secondaryTheme` | Detailed feature/aspect category |
| `sentiment` | Score: `-1` (negative), `0` (neutral), `1` (positive) |
| `stage` | Journey stage (mirrors `mainTheme`) |
| `signal` | Human-readable signal interpretation |

**Customer journey stages** (navigation tabs in mockup): Ожидания → Выбор → Доставка → Первый опыт → Живу с продуктом → Расширение → Поддержка → Лояльность

## UI Architecture (from mockups)

The dashboard has three regions:
1. **Left sidebar** — section navigation: CJM, Опросы, Отзывы, Статистика
2. **Main panel** — journey-stage tabs at top, then:
   - 5 metric scores across stages
   - Aspects count + sentiment split bar
   - Боли (Pains) and Барьеры (Barriers) panels — top-of-mind qualitative summaries
   - ТОП проблем list — ranked signals with bar chart
   - Summary — sentiment breakdown by signal category with percentages
3. **Right drawer** — full review text panel, opens on signal click

## Mockups

See `mockups/` — two PNG screenshots of the intended dashboard design (light and dark variants).
