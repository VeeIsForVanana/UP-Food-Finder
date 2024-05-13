
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
    name: 'theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #73070B 
		"--color-primary-50": "234 218 218", // #eadada
		"--color-primary-100": "227 205 206", // #e3cdce
		"--color-primary-200": "220 193 194", // #dcc1c2
		"--color-primary-300": "199 156 157", // #c79c9d
		"--color-primary-400": "157 81 84", // #9d5154
		"--color-primary-500": "115 7 11", // #73070B
		"--color-primary-600": "104 6 10", // #68060a
		"--color-primary-700": "86 5 8", // #560508
		"--color-primary-800": "69 4 7", // #450407
		"--color-primary-900": "56 3 5", // #380305
		// secondary | #325d3f 
		"--color-secondary-50": "224 231 226", // #e0e7e2
		"--color-secondary-100": "214 223 217", // #d6dfd9
		"--color-secondary-200": "204 215 207", // #ccd7cf
		"--color-secondary-300": "173 190 178", // #adbeb2
		"--color-secondary-400": "112 142 121", // #708e79
		"--color-secondary-500": "50 93 63", // #325d3f
		"--color-secondary-600": "45 84 57", // #2d5439
		"--color-secondary-700": "38 70 47", // #26462f
		"--color-secondary-800": "30 56 38", // #1e3826
		"--color-secondary-900": "25 46 31", // #192e1f
		// tertiary | #F8DE7E 
		"--color-tertiary-50": "254 250 236", // #fefaec
		"--color-tertiary-100": "254 248 229", // #fef8e5
		"--color-tertiary-200": "253 247 223", // #fdf7df
		"--color-tertiary-300": "252 242 203", // #fcf2cb
		"--color-tertiary-400": "250 232 165", // #fae8a5
		"--color-tertiary-500": "248 222 126", // #F8DE7E
		"--color-tertiary-600": "223 200 113", // #dfc871
		"--color-tertiary-700": "186 167 95", // #baa75f
		"--color-tertiary-800": "149 133 76", // #95854c
		"--color-tertiary-900": "122 109 62", // #7a6d3e
		// success | #a2c8a2 
		"--color-success-50": "241 247 241", // #f1f7f1
		"--color-success-100": "236 244 236", // #ecf4ec
		"--color-success-200": "232 241 232", // #e8f1e8
		"--color-success-300": "218 233 218", // #dae9da
		"--color-success-400": "190 217 190", // #bed9be
		"--color-success-500": "162 200 162", // #a2c8a2
		"--color-success-600": "146 180 146", // #92b492
		"--color-success-700": "122 150 122", // #7a967a
		"--color-success-800": "97 120 97", // #617861
		"--color-success-900": "79 98 79", // #4f624f
		// warning | #d8a50e 
		"--color-warning-50": "249 242 219", // #f9f2db
		"--color-warning-100": "247 237 207", // #f7edcf
		"--color-warning-200": "245 233 195", // #f5e9c3
		"--color-warning-300": "239 219 159", // #efdb9f
		"--color-warning-400": "228 192 86", // #e4c056
		"--color-warning-500": "216 165 14", // #d8a50e
		"--color-warning-600": "194 149 13", // #c2950d
		"--color-warning-700": "162 124 11", // #a27c0b
		"--color-warning-800": "130 99 8", // #826308
		"--color-warning-900": "106 81 7", // #6a5107
		// error | #d41155 
		"--color-error-50": "249 219 230", // #f9dbe6
		"--color-error-100": "246 207 221", // #f6cfdd
		"--color-error-200": "244 196 213", // #f4c4d5
		"--color-error-300": "238 160 187", // #eea0bb
		"--color-error-400": "225 88 136", // #e15888
		"--color-error-500": "212 17 85", // #d41155
		"--color-error-600": "191 15 77", // #bf0f4d
		"--color-error-700": "159 13 64", // #9f0d40
		"--color-error-800": "127 10 51", // #7f0a33
		"--color-error-900": "104 8 42", // #68082a
		// surface | #EDE7D9 
		"--color-surface-50": "252 251 249", // #fcfbf9
		"--color-surface-100": "251 250 247", // #fbfaf7
		"--color-surface-200": "251 249 246", // #fbf9f6
		"--color-surface-300": "248 245 240", // #f8f5f0
		"--color-surface-400": "242 238 228", // #f2eee4
		"--color-surface-500": "237 231 217", // #EDE7D9
		"--color-surface-600": "213 208 195", // #d5d0c3
		"--color-surface-700": "178 173 163", // #b2ada3
		"--color-surface-800": "142 139 130", // #8e8b82
		"--color-surface-900": "116 113 106", // #74716a
		
	}
}