<p align="center">
  <img src="https://raw.githubusercontent.com/johannesWen/Victron-Charge-Controller/main/custom_components/victron_charge_control/brand/icon.png" height="104" alt="Victron Charge Controller logo">
</p>

<h1 align="center">Victron Charge Controller Dashboard</h1>

<p align="center">
  <strong>A polished Home Assistant Lovelace card for monitoring and steering Victron ESS charge control.</strong>
</p>

<p align="center">
  <a href="https://github.com/hacs/integration"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5?style=flat-square" alt="HACS custom repository"></a>
  <a href="https://github.com/johannesWen/Victron-Charge-Controller-Dashboard/releases"><img src="https://img.shields.io/github/v/release/johannesWen/Victron-Charge-Controller-Dashboard?style=flat-square" alt="Latest release"></a>
  <a href="https://github.com/johannesWen/Victron-Charge-Controller-Dashboard/releases"><img src="https://img.shields.io/github/release-date/johannesWen/Victron-Charge-Controller-Dashboard?style=flat-square" alt="Release date"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/johannesWen/Victron-Charge-Controller-Dashboard?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/Home%20Assistant-Lovelace-18BCF2?style=flat-square" alt="Home Assistant Lovelace">
</p>

The Victron Charge Controller Dashboard is a custom Lovelace card for the
[Victron Charge Controller](https://github.com/johannesWen/Victron-Charge-Controller)
Home Assistant integration. It gives you a compact control surface for charge modes,
SOC limits, grid setpoints, EPEX Spot based scheduling, manual hour overrides, and
energy cost/revenue history.

## Preview

| Settings | Plan |
| :---: | :---: |
| <a href="assets/screenshots/settings_card.png"><img src="https://raw.githubusercontent.com/johannesWen/Victron-Charge-Controller-Dashboard/main/assets/screenshots/settings_card.png" width="420" alt="Settings card screenshot"></a> | <a href="assets/screenshots/plan_card.png"><img src="https://raw.githubusercontent.com/johannesWen/Victron-Charge-Controller-Dashboard/main/assets/screenshots/plan_card.png" width="420" alt="Plan card screenshot"></a> |

| History |
| :---: |
| <a href="assets/screenshots/costs_card.png"><img src="https://raw.githubusercontent.com/johannesWen/Victron-Charge-Controller-Dashboard/main/assets/screenshots/costs_card.png" width="420" alt="History card screenshot"></a> |

## Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Card Configuration](#card-configuration)
- [Views](#views)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Three focused views** for settings, schedule planning, and historical cost/energy charts.
- **Mode control** for `off`, `auto`, `manual`, `force_charge`, and `force_discharge`.
- **Runtime tuning** for charge/discharge power, SOC boundaries, grid limits, idle setpoint, and EPEX Spot price thresholds.
- **Grid feed-in control** with configurable default/reduced feed-in limits and price trigger.
- **Interactive schedule chart** showing today and tomorrow, current hour, price thresholds, blocked hours, and planned charge/discharge periods.
- **Manual hour overrides** by right-clicking or long-pressing future plan bars.
- **Cost and revenue history** using Home Assistant long-term statistics for grid import/export and calculated EUR totals.
- **Visual Lovelace editor** for selecting the card view and entity prefix without YAML editing.

## Requirements

This frontend card depends on the backend integration:

- [Victron Charge Controller](https://github.com/johannesWen/Victron-Charge-Controller)
- Home Assistant with Lovelace custom cards enabled
- HACS for the recommended installation path, or manual resource registration

The default entity prefix is `victron_charge_control`, matching the backend integration's generated entities.

## Installation

### HACS

1. Open **HACS** in Home Assistant.
2. Go to **Frontend**.
3. Open the three-dot menu and select **Custom repositories**.
4. Add this repository URL:

   ```text
   https://github.com/johannesWen/Victron-Charge-Controller-Dashboard
   ```

5. Select category **Dashboard**.
6. Install **Victron Charge Controller Card**.
7. Reload the browser or clear the frontend cache.

### Manual

1. Download `victron-charge-controller-card.js` from the
   [latest release](https://github.com/johannesWen/Victron-Charge-Controller-Dashboard/releases).
2. Copy the file into your Home Assistant `config/www/` directory.
3. Add it as a dashboard resource:

   ```yaml
   resources:
     - url: /local/victron-charge-controller-card.js
       type: module
   ```

4. Reload the browser.

## Card Configuration

Add the card from the Lovelace UI or configure it directly in YAML.

### UI

1. Edit your dashboard.
2. Select **Add Card**.
3. Search for **Victron Charge Controller**.
4. Choose the desired view in the visual editor.

### YAML

```yaml
type: custom:victron-charge-controller-card
title: Victron Charge Control
entity_prefix: victron_charge_control
view: settings
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | `Victron Charge Control` | Card title shown in the header. |
| `entity_prefix` | string | `victron_charge_control` | Prefix used by the backend integration entities. |
| `view` | string | `settings` | Card view: `settings`, `plan`, or `history`. |

## Views

| View | Purpose |
| --- | --- |
| `settings` | Operate the controller, adjust limits, configure price thresholds, tune grid feed-in behavior, and recalculate schedules. |
| `plan` | Inspect the EPEX Spot based plan for today and tomorrow, view blocked hours, and set manual actions for future hours. |
| `history` | Review grid cost, revenue, import, and export statistics by day, week, month, or year. |

## Troubleshooting

| Issue | Resolution |
| --- | --- |
| Card is not available in the Add Card dialog | Hard-refresh the browser (`Ctrl+Shift+R` / `Cmd+Shift+R`) and confirm the HACS frontend resource was added. |
| `Custom element doesn't exist` | Verify the resource URL points to `victron-charge-controller-card.js` and uses `type: module`. |
| Entities are missing | Confirm the backend integration is installed and that `entity_prefix` matches your entity IDs. |
| Plan view is empty | Recalculate the schedule in the backend integration and confirm the EPEX Spot sensor exposes price data. |
| History view is empty | Confirm Home Assistant recorder statistics are enabled for the cost/revenue or import/export sensors. |

## Development

Install dependencies and build the bundled card:

```bash
npm install
npm run build
```

Useful development commands:

```bash
npm run watch
npm run serve
```

The build output is written to `dist/victron-charge-controller-card.js`.

### Local Home Assistant

This repository includes a Docker Compose setup for testing the frontend with the backend integration and dummy entities.

```bash
npm run build
docker compose up -d
```

Then open Home Assistant at:

```text
http://localhost:8123
```

Stop the development stack with:

```bash
docker compose down
```

## Contributing

Contributions are welcome. Please open an issue for larger changes before investing significant work.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a pull request.

## License

Licensed under the [MIT License](LICENSE).
