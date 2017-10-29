import { css } from 'styled-components'

export const media = {
	medium: (...args) => css`
		@media (max-width: 1000px) {
			${ css(...args) }
		}
	`,
	small: (...args) => css`
		@media (max-width: 520px) {
			${ css(...args) }
		}
	`
}
