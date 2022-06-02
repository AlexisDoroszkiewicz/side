import { css } from "@emotion/react";

const CSSreset = css`
	/* Box sizing rules */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	/* Remove default margin */
	body,
	h1,
	h2,
	h3,
	h4,
	p,
	figure,
	blockquote,
	dl,
	dd,
	ul,
	ol {
		margin: 0;
	}

	/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
	ul,
	ol {
		padding: 0;
		list-style: none;
	}

	/* Set core body defaults */
	body {
		min-height: 100vh;
		text-rendering: optimizeSpeed;
		line-height: 1.5;
	}

	/* Remove anchor default styles */
	a {
		text-decoration-skip-ink: auto;
		line-height: 1;
	}

	/* Make images easier to work with */
	img,
	picture {
		max-width: 100%;
		display: block;
	}

	/* Inherit fonts for inputs and buttons */
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
	@media (prefers-reduced-motion: reduce) {
		html:focus-within {
			scroll-behavior: auto;
		}

		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}
`;

export default CSSreset;
