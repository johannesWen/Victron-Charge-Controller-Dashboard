# Dev Home Assistant Setup

This directory contains the Home Assistant dev configuration used by the
dashboard card.

## Backfill Cost Statistics

The Costs view reads Home Assistant long-term statistics for:

- `sensor.victron_charge_control_grid_energy_cost`
- `sensor.victron_charge_control_grid_energy_revenue`

The dev config provides dummy grid consumption, grid feed-in, and EPEX spot
price sensors. To make the day/week/month/year cost plots useful immediately,
backfill the recorder statistics with:

```bash
./dev/backfill_cost_statistics.py --dry-run --days 30
```

If the preview looks good, create a Home Assistant long-lived access token:

1. Open Home Assistant.
2. Go to your user profile.
3. Create a long-lived access token.
4. Export it as `HA_TOKEN`.

Then import the statistics:

```bash
HA_TOKEN="your-long-lived-token" ./dev/backfill_cost_statistics.py --days 30 --clear-first
```

`--clear-first` removes existing cost/revenue statistics for the two dev
entities before importing the generated rows. This is usually what you want
when iterating on dummy data.

Useful options:

```bash
./dev/backfill_cost_statistics.py \
  --url http://localhost:8123 \
  --days 30 \
  --timezone Europe/Berlin \
  --prefix victron_charge_control \
  --clear-first
```

Notes:

- The script imports long-term statistics, not raw entity history.
- The card uses Home Assistant's `recorder/statistics_during_period` API, so
  the plot needs recorder statistics rows.
- The generated data mirrors the dummy profiles in `configuration.yaml`.
- Refresh the Costs view after the import finishes.
- If Home Assistant is not on `localhost:8123`, pass `--url`.
