# Artemis Mission Visualization

An interactive 3D web application developed by our team for the NASA App Development Challenge. It visualizes mission trajectory data and displays spacecraft metrics and ground-station communication estimates.

**[Explore the live demo](https://passaic.space/)**

## What it does

- Visualizes Earth, the Moon, and spacecraft trajectories using Three.js.
- Displays nominal and off-nominal mission tracks.
- Provides playback controls and a timeline for exploring the mission.
- Shows mission time, spacecraft velocity, and travel distance.
- Displays antenna availability and estimated communication data rates.

## My contribution

I developed the JavaScript calculation logic for the mission metrics and antenna communication estimates.

My work included:
- Calculating spacecraft speed from velocity components.
- Calculating travel distance from trajectory positions.
- Implementing link-budget calculations to estimate communication data rates.
- Comparing antenna estimates to support antenna prioritization.

This was a team project. My contribution focused on the calculations that support the visualization and its data panels.

## Technologies

JavaScript, Three.js, WebGL, HTML, and CSS.

## Key files

| File | Purpose |
| --- | --- |
| `Orion_Path_final.html` | Visualization, playback controls, and mission data displays |
| `scripts/mainAntenna.mjs` | Antenna link-budget calculations and visualization helpers |
| `scripts/artemisData.js` | Mission trajectory and ground-station data |
| `model/` | 3D model assets |
| `Images/` | Images and textures |

Earlier HTML versions are also included in this repository.

## Repository status

The live demo differs slightly from the version stored here. The repository currently contains capitalization mismatches in some asset paths that need to be corrected for case-sensitive hosting.

The antenna calculation code also contains a known assignment bug in `if (link1 = -1)` that needs correction. Communication estimates should be treated as project outputs, not validated operational results.

## Credits

Developed collaboratively for the NASA App Development Challenge. Third-party model attribution and license information are included in the relevant model folders.
