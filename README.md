# Victron Charge Controller Dashboard

> **This repository is deprecated.**
>
> The Lovelace card has been merged into the backend integration,
> [Victron Charge Controller](https://github.com/johannesWen/Victron-Charge-Controller).
> As of integration version **2.0.0**, the card is bundled with the integration
> and auto-loaded by Home Assistant — no separate HACS "Dashboard" download or
> manual Lovelace resource entry is required.

## How to migrate

1. Update the **Victron Charge Control** integration in HACS to `>= 2.0.0`.
2. Remove the standalone dashboard from HACS (Frontend → Victron Charge Controller Card → uninstall).
3. Remove the manual Lovelace resource if you added one manually:

   ```yaml
   resources:
     - url: /local/victron-charge-controller-card.js
       type: module
   ```

4. Hard-refresh your browser. The card is now served from the integration at
   `/api/victron_charge_control/victron-charge-controller-card.js` and
   auto-loaded on every dashboard.

Your existing card configuration (`type: custom:victron-charge-controller-card`)
continues to work unchanged.

For documentation, see the
[integration README](https://github.com/johannesWen/Victron-Charge-Controller#dashboard-card).

## License

Licensed under the [MIT License](LICENSE).