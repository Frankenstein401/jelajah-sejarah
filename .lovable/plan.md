

## Plan: Parallax Decorations + Reader Bug Fix + Discussion Feature

### 1. Fix ArticleReader Bug
File: `src/components/ArticleReader.tsx`

There are **debug console.log and speechSynthesis calls at module level** (lines 187-194) that run on import, causing unwanted speech and errors. These must be removed.

Also remove the `SkipForward` import (no longer used) and the `handleSkip` function + skip button since the user previously requested no "skip" functionality.

### 2. Parallax Scroll on ArticleDecoration
File: `src/components/ArticleDecoration.tsx`

Replace static `motion.div` animations with `useScroll` + `useTransform` from framer-motion to create parallax movement as user scrolls through the article. The background shape will translate vertically at a slower rate than scroll, and the accent shape will move in the opposite direction slightly.

### 3. Discussion/Comment Section per Article
File: `src/components/ArticleDiscussion.tsx` (new)

A lightweight, localStorage-based discussion component (no backend needed yet, but structured for future Supabase migration):
- Display list of comments with name, timestamp, and message
- Form with name input + comment textarea + submit button
- Comments stored in `localStorage` keyed by article slug
- Animated entry for new comments using framer-motion

File: `src/pages/ArticleDetail.tsx`
- Import and render `ArticleDiscussion` between the quiz section and related articles section, passing `article.slug` and `article.title`

### Technical Details

**Parallax implementation** uses `useScroll({ target: containerRef })` with `useTransform(scrollYProgress, [0, 1], [startY, endY])` to shift decorations based on scroll position within the article body.

**Discussion data shape:**
```typescript
interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}
```
Stored as `discussions_{slug}` in localStorage. When Supabase is connected later, this can be swapped to a `discussions` table.

**Reader fix** simply removes lines 187-194 (the bare `console.log` and `speechSynthesis.speak` calls outside the component) and cleans up the unused skip functionality.

