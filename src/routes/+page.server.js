import { readdir } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import yaml from 'js-yaml'

export async function load({ url }) {
	const lessonFiles = (await readdir('src/lib/lessons')).filter(f => f.endsWith('.yml'))

	const selectedWeekFile = url.searchParams.get('week') || lessonFiles[0]

	let weekData = null
	let error = null

	try {
		const filePath = `src/lib/lessons/${selectedWeekFile}`
		const fileContent = readFileSync(filePath, 'utf-8')
		weekData = yaml.load(fileContent)
		// TODO: Add schema validation here using Ajv and lesson.schema.json
	} catch (e) {
		console.error(`Could not load or parse ${selectedWeekFile}`, e)
		error = `Error parsing ${selectedWeekFile}: ${e.message}`
	}

	return {
		lessonFiles,
		selectedWeekFile,
		weekData,
		error
	}
}
