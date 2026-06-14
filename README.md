<p align="left">
    <img src="https://github.com/johannesWen/Victron-Charge-Controller/blob/main/custom_components/victron_charge_control/brand/icon.png" height="100" alt="Victron Charge Controller logo">
</p>

# Victron Charge Controller Card

[![hacs][hacs-badge]][hacs-url]
[![release][release-badge]][release-url]
[![license][license-badge]][license-url]

A custom [Home Assistant](https://www.home-assistant.io/) Lovelace dashboard card for controlling and monitoring a Victron ESS system via the [Victron Charge Controller](https://github.com/johannesWen/Victron-Charge-Controller) integration.

| Settings Card | Plan Card |
|:---:|:---:|
| <a href="assets/screenshots/settings_card.png"><img src="https://raw.githubusercontent.com/johannesWen/Victron-Charge-Controller-Dashboard/main/assets/screenshots/settings_card.png" width="400"></a> | <a href="assets/screenshots/plan_card.png"><img src="https://raw.githubusercontent.com/johannesWen/Victron-Charge-Controller-Dashboard/refs/heads/main/assets/screenshots/plan_card.png" width="400"></a> |
| **History Card** | |
| <a href="assets/screenshots/costs_card.png"><img src="https://raw.githubusercontent.com/johannesWen/Victron-Charge-Controller-Dashboard/refs/heads/main/assets/screenshots/costs_card.png" width="400"></a> | |

<!-- Badges -->
[hacs-badge]: https://img.shields.io/badge/HACS-CUSTOM-41BDF5?style=flat-square
[hacs-url]: https://github.com/hacs/integration
[release-badge]: https://img.shields.io/github/v/release/johannesWen/Victron-Charge-Controller-Dashboard?style=flat-square
[release-url]: https://github.com/johannesWen/Victron-Charge-Controller-Dashboard/releases
[license-badge]: https://img.shields.io/github/license/johannesWen/Victron-Charge-Controller-Dashboard?style=flat-square
[license-url]: LICENSE

<!-- Table of Contents -->
## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Mode selection** — Switch between Off, Auto, Manual, Force Charge, and Force Discharge
- **Charge / Discharge control** — Toggle charging and discharging, adjust power setpoints
- **Battery limits** — Set minimum and maximum SOC
- **Grid settings** — Configure idle, min, and max grid setpoints
- **Auto mode tuning** — Cheapest/expensive hours, price thresholds for charge and discharge
- **Grid feed-in control** — Enable/disable feed-in, set price threshold and power limits
- **Blocked hours** — Visual hour-chip grid to block charging or discharging during specific hours
- **Manual bar selection** — Right-click (or long-press) any future hour on the plan chart to set it to Charge, Discharge, or Idle, and add it to the active plan
- **Cost / revenue chart** — Plot grid energy cost and revenue from Home Assistant long-term statistics
- **Action buttons** — Recalculate schedule or clear the current schedule
- **Visual editor** — Choose the card view directly from the Lovelace UI

## Prerequisites

This card requires the **Victron Charge Controller** custom integration to be installed and configured in Home Assistant:

[https://github.com/johannesWen/Victron-Charge-Controller](https://github.com/johannesWen/Victron-Charge-Controller)

## Installation

### HACS (recommended)

1. Open **HACS** in Home Assistant
2. Go to **Frontend** → click the three-dot menu → **Custom repositories**
3. Add `https://github.com/johannesWen/Victron-Charge-Controller-Dashboard` with category **Dashboard**
4. Search for **Victron Charge Controller Card** and install it
5. Reload your browser

### Manual

1. Download `victron-charge-controller-card.js` from the [latest release](https://github.com/johannesWen/Victron-Charge-Controller-Dashboard/releases)
2. Copy it to your Home Assistant `config/www/` directory
3. Add the resource in **Settings → Dashboards → Resources** (or in your Lovelace YAML config):

   ```yaml
   resources:
     - url: /local/victron-charge-controller-card.js
       type: module
   ```

4. Reload your browser

## Configuration

Add the card to your dashboard via the UI editor or YAML.

### UI Editor

1. Edit your dashboard → **Add Card** → search for **Victron Charge Controller**
2. Choose the Settings, Plan, or History view in the visual editor

### YAML

```yaml
type: custom:victron-charge-controller-card
title: Victron Charge Control
entity_prefix: victron_charge_control
view: settings
```

| Option          | Type   | Default                    | Description                                        |
| --------------- | ------ | -------------------------- | -------------------------------------------------- |
| `title`         | string | `Victron Charge Control`   | Card title displayed in the header                 |
| `entity_prefix` | string | `victron_charge_control`   | Common prefix of all entity IDs from the integration |
| `view`          | string | `settings`                 | Card view: `settings`, `plan`, or `history`         |

## Troubleshooting

| Issue | Solution |
| ----- | -------- |
| Card not showing in the Add Card dialog | Clear your browser cache or do a hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) |
| Entities not found | Verify the `entity_prefix` matches your integration setup. Check that the [Victron Charge Controller](https://github.com/johannesWen/Victron-Charge-Controller) integration is installed and configured |
| Card shows "Custom element doesn't exist" | Ensure the resource URL is correct in **Settings → Dashboards → Resources** and ends with `.js` |
| History chart is empty | The History view relies on Home Assistant long-term statistics. Make sure the recorder is enabled and has collected data for your energy sensors |

## Development

### Building from source

```bash
# Install dependencies
npm install

# Build the bundled card
npm run build

# Watch for changes during development
npm run watch

# Run the live development server
npm run serve
```

The output is written to `dist/victron-charge-controller-card.js`.

### Testing in Home Assistant (Docker)

A `docker-compose.yml` is included that spins up a full Home Assistant instance with the card and the backend integration pre-loaded, along with dummy sensors so no real hardware is needed.

```bash
# 1. Build the card
npm run build

# 2. Start the dev container
docker compose up -d

# 3. Open Home Assistant
#    http://localhost:8123
```

On first launch, complete the HA onboarding wizard. The Lovelace dashboard at **Overview** will already contain the card and helper controls to adjust dummy sensor values (Battery SOC, Grid Setpoint, EPEX Spot Price).

To iterate on the card, rebuild with `npm run build` and hard-refresh the browser (`Ctrl+Shift+R`).

Stop the container with:

```bash
docker compose down
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
