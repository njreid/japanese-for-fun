<script>
	import { goto } from '$app/navigation'
	import Flashcard from '$lib/components/Flashcard.svelte'

	let { data } = $props()

	let selectedWeek = $state(data.selectedWeekFile)

	$effect(() => {
		if (selectedWeek !== data.selectedWeekFile) {
			goto(`/?week=${selectedWeek}`)
		}
	})

	function printPage() {
		window.print()
	}

	const defaultSheet = { name: 'Default', em: true, fu: false, ro: true, eng: true, jp: true }
</script>

<main class="container">
	<header class="no-print">
		<h1>Japanese Vocabulary Flashcards</h1>
		<p>Select a week to generate printable flashcards for all its lessons.</p>

		<label for="week-select">Week:</label>
		<select id="week-select" bind:value={selectedWeek}>
			{#each data.lessonFiles as file}
				<option value={file}>Week {file.match(/\d+/)[0]}</option>
			{/each}
		</select>

		<button onclick={printPage}>Print Week</button>
	</header>

	{#if data.error}
		<article class="error">
			<h2>Failed to load lesson</h2>
			<p>{data.error}</p>
		</article>
	{:else if data.weekData}
		<div id="page-container" class="page-container">
			{#each data.weekData.lessons as lesson}
				{#if lesson.words && lesson.words.length > 0}
					{@const sheetsToRender =
						lesson.sheets && lesson.sheets.length > 0 ? lesson.sheets : [defaultSheet]}
					{#each sheetsToRender as sheet}
						<section class="sheet-section">
							<header>
								<h2 class="lesson-title">Lesson {lesson.lessonNumber}: {lesson.theme}</h2>
								<h3 class="sheet-title">{sheet.name}</h3>
							</header>
							<div class="flashcard-grid">
								{#each lesson.words as word (word.japanese || word.emoji)}
									<Flashcard {word} settings={sheet} />
								{/each}
							</div>
						</section>
					{/each}
				{/if}
			{/each}
		</div>
	{:else}
		<p>Could not load lesson data. Please check the file and try again.</p>
	{/if}
</main>

<style>
	.error {
		border: 1px solid var(--pico-form-invalid-border-color);
		background-color: var(--pico-form-invalid-background-color);
		padding: 1rem;
		border-radius: var(--pico-border-radius);
	}
	.sheet-section {
		page-break-before: always;
	}
	.sheet-section:first-of-type {
		page-break-before: auto;
	}
	.lesson-title {
		font-size: 1.5rem;
		font-weight: 600;
		text-align: center;
		margin-bottom: 0.25rem;
	}
	.sheet-title {
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		margin-bottom: 1.5rem;
		color: #555;
	}

	@media print {
		.lesson-title {
			font-size: 18pt;
		}
		.sheet-title {
			font-size: 16pt;
		}
	}
</style>
