import { use } from "https://cdn.jsdelivr.net/gh/ckoshka/free/mod.ts";

// a utility that:
// - fetches a url,
// - and converts its html to markdown

// free comes with a bunch of predefined effect signatures,
// but we'll define some here for the sake of clarity.

type ArgsReader = {
	url: string;
};

type FetchUrlEffect = {
	fetch: (url: string) => Promise<string>;
};

type ToMarkdownEffect = {
	toMd: (html: string) => string;
};

// from here, it's pretty simple.
// we declare what effects we want to use,
// and immediately get access to them
// without worrying about the specifics:

const getMarkdown = () =>
	use<FetchUrlEffect & ToMarkdownEffect & ArgsReader>()
		.map2((fx) => fx.fetch(fx.url))
		.map((html, fx) => fx.toMd(html));

// if our end-user wants to save this to disk,
// they don't even have to supply any of the effects

const _saveMarkdown = getMarkdown().map((text) =>
	Deno.writeTextFile("my_file.md", text)
);

// or alternatively, they could create their own:

type SaveEffect = {
	save: (contents: string) => void;
};

const saveMarkdown = use<SaveEffect>()
	.chain(getMarkdown)
	.map((contents, fx) => fx.save(contents));

// now the magic happens.
// say we want to test this and make sure it works
// before performing any permanent side-effects:

import { default as Turndown } from "https://cdn.skypack.dev/turndown"; 

await saveMarkdown.run({
	// we get full autocompletion here
	fetch: (url) => fetch(url).then((r) => r.text()),
	// let's inspect the contents first:
	save: console.log,
	// we can use any library we like here
	toMd: html => new Turndown().turndown(html),
    url: `https://en.wikipedia.org/wiki/Monad_(functional_programming)`
});