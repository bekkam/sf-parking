"""Utility file to seed database with bike parking locations"""

import csv
from model import Parking, connect_to_db, db
from server import app


def load_bike_data():
    """Load bicycle parking data into database"""

    # keep file open until finish looping
    with open("data/Bicycle_Parking__Public.csv", 'rb') as csvfile:

        # create a csv reader object
        csv_reader = csv.reader(csvfile, delimiter=',')

        # ignore header row
        next(csv_reader)

        for i, row in enumerate(csv_reader):
            if row[0] != '0':
                year = row[0]
            if row[1] != '0':
                month = row[1]
            address = row[3]
            location = row[4]
            placement = row[6]
            racks = row[7]
            spaces = row[8]
            coords = row[10][1:-1].split(', ')
            if len(coords) < 2:
                continue
            else:
                y, x = coords

            new_parking = Parking(address=address, location=location,
                                  placement=placement, install_month=int(month),
                                  install_year=int(year), num_racks=int(racks),
                                  num_spaces=int(spaces), lat=float(x),
                                  longitude=float(y))
            db.session.add(new_parking)

            if i % 1000 == 0:
                db.session.commit()
                print "processed row ", i

    print "Finished seeding database."


def main():
    connect_to_db(app)
    load_bike_data()


if __name__ == "__main__":
    main()
