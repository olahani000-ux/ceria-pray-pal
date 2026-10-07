<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep shareable screens as individual TanStack file routes; navigation must remain refreshable and deep-linkable.
- Use the RajinProvider for temporary in-memory preview data only; persistence and protected parent access await a separate backend phase.
- Keep shared mobile chrome in the Rajin shared module and reference-screen views in the screens module to maintain one visual system across routes.
- Define all presentation tokens and app-specific control variants in the global stylesheet and Button variants; keep the reference's rounded pastel treatments consistent.
- Render home prayer illustrations through the dedicated PrayerIcon SVG module with global semantic palette classes; icon-only updates must not affect sibling screens or row geometry.
