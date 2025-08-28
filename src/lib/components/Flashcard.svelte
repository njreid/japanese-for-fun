<script>
	let { word, settings } = $props()
</script>

<div class="flashcard" style={!word.japanese ? 'border: none;' : ''}>
    {#if !word.japanese}
        <div class="emoji-only">{word.emoji}</div>
        {#if word.english}
            <p class="english-text" style="text-align: center;">{word.english}</p>
        {/if}
    {:else}
        {#if settings.em}
            <div class="emoji">{word.emoji}</div>
        {/if}
        <div class="japanese-container">
            <ruby class="japanese-text">
                <rb>{settings.jp === false ? word.furigana : word.japanese}</rb>
                {#if settings.ro}
                    <rt>{word.romaji}</rt>
                {:else if settings.fu && settings.jp !== false}
                    <rt>{word.furigana}</rt>
                {/if}
            </ruby>
        </div>
        {#if settings.eng}
            <p class="english-text">
                {word.english}
            </p>
        {:else}
            <div class="write-in-line"></div>
        {/if}
    {/if}
</div>

<style>
    .emoji-only {
        font-size: 6rem;
        line-height: 1;
        width: 100%;
        text-align: center;
    }
	.emoji {
		font-size: 4rem;
		line-height: 1;
	}
	.japanese-container {
		margin-top: 0.5rem;
	}
	.japanese-text {
		font-size: 1.875rem; /* 30px */
		line-height: 2.25rem; /* 36px */
		font-weight: 700;
	}
	.english-text {
		margin-top: 0.5rem;
		font-size: 1.125rem; /* 18px */
		line-height: 1.75rem; /* 28px */
		font-weight: 600;
		margin-bottom: 0;
	}
</style>
