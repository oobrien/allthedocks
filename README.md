# allthedocks

Route planning.

Working map at https://map.allthedocks.com/

The GPX files each contain 7 routes (along the streets) + all the waypoints (docks)

The map uses the GPX and TSV files here on GitHub, plus a local DB API call to get the visited list and time.  

V1 published late on 3 July 2023.

V2 published on 6 July 2023 pm, updated S route to include a new docking station and a removal, and P route for a removal. To keep the numbers the same, an S was moved to P and S gained an extra docking station at the end. Also minor update to S, P and N to fix a number sequence typo.

V3 published late on 7 July 2023, update routes to reflect two removals. Now 161 in total for all teams. Also some rerouting based on a TSP solver's suggestions. 

V4 will be published late on 8 July, the "London 10K" edition, with P and W early stages changed significantly to avoid the closed sections. (Minor changes to the other teams too). 

## Team distances (km)

| Edition | W   | P   | S   | N   | E   | Average | Docks | Docks/Team |
| ------- | --- | --- | --- | --- | --- | ----- | ---- | --- |
| First Draft | 72.1  | 76.1 | 70.2 | 64.7 | 76.3 | 71.9 | 799 | 162 | 
| V1   | 71.8 | 72.7 | 72.2 | 70.7 | 72.4 | 72.0 | 162 | 798 |
| V2   | 71.8 | 73.0 | 72.5 | 70.7 | 72.4 | 72.1 | 162 |797 |
| V3 "TSP" | 71.7 | 71.7 | 71.9 | 70.6 | 72.2 | 71.6 | 796 | 161 |
| V4 "London 10K Edition" | TBC | TBC | TBC | TBC | TBC | TBC | 797? | 162? |
