import numpy as np

dates = []
for i in range(31):
	if (i+1)%7 < 5:
		dates.append(i+1)
drivers = list(range(1, 51))
drivers = np.array(drivers)
autos = list(range(200, 220))
carts = list(range(100, 130))


sql = 'insert into Schedule(vehicle_id, driver_id, date) Values'
for d in dates:
	date = '\'2018-05-{:02d}\''.format(d)
	drivers_d = np.random.permutation(drivers)[:40]
	carts_d = np.random.permutation(carts)[:20]
	for i, auto in enumerate(autos):
		sql+='\n({}, {}, {}),'.format(auto, drivers_d[i], date)
	for i, cart in enumerate(carts_d):
		sql+='\n({}, {}, {}),'.format(cart, drivers_d[i+20], date)

with open('schedule.sql', 'w') as f:
	f.write(sql)