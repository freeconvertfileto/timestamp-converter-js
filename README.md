# Timestamp Converter

Convert Unix timestamps to human-readable dates and back, with a live world clock for 22 cities and a timezone reference grid for 40 zones, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/calculators/timestamp-converter

## How It Works

Unix-to-datetime conversion uses `new Date(unixMs)` and formats with `toLocaleString` with the selected timezone option. Datetime-to-Unix converts by parsing the local datetime string via `new Date(datetimeStr).getTime() / 1000`. The live world clock renders 22 city entries using `Intl.DateTimeFormat` with each city's IANA timezone string, refreshed by `setInterval(updateLive, 1000)` every second. The timezone reference grid populates 40 zones by calling `new Intl.DateTimeFormat('en', { timeZone, hour: 'numeric', minute: 'numeric', timeZoneName: 'short' })`. `getOffsetStr(tz)` computes the UTC offset by comparing `Date.UTC` against `new Date().toLocaleString('en-US', { timeZone })` parsed back to a timestamp.

## Features

- Unix timestamp (seconds) ↔ human-readable datetime conversion
- Timezone selector for all conversions
- Live world clock: 22 cities updated every second via `setInterval`
- Timezone reference grid: 40 IANA zones with current time and UTC offset
- `getOffsetStr`: UTC offset string derived from `Intl.DateTimeFormat`

## Browser APIs Used

- Date API (`new Date`, `getTime`, `toLocaleString`)
- Internationalization API (`Intl.DateTimeFormat` with `timeZone` option)
- `setInterval` (live clock refresh)

## Code Structure

| File | Description |
|------|-------------|
| `timestamp-converter.js` | Unix↔datetime conversion, `updateLive` world clock with `setInterval(1000)`, 40-zone grid via `Intl.DateTimeFormat`, `getOffsetStr` UTC offset calculation |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#tscUnix` | Unix timestamp input (seconds) |
| `#tscDatetime` | Human-readable datetime input |
| `#tscTz` | Timezone selector |
| `#tscToDate` | Convert Unix → datetime button |
| `#tscToUnix` | Convert datetime → Unix button |
| `#tscResultDate` | Datetime result display |
| `#tscResultUnix` | Unix result display |
| `#tscWorldClock` | Live world clock grid (22 cities) |
| `#tscTzGrid` | Timezone reference grid (40 zones) |

## License

MIT
