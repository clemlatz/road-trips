#! /bin/bash

set -e

# move to location of this script
cd $(dirname "$0")

output_file=../../src/trips/trips.yaml

# if [[ -f "$output_file" ]]; then
#     echo "Removing previous trips file..."
#     rm "$output_file"
# fi

touch $output_file
echo "" > $output_file

trips=$(ls */*.yaml)
for trip in $trips; do
    echo $trip
    echo "---" >> $output_file
    cat $trip >> $output_file
    # write all entries to file
    echo "entries:" >> $output_file
    trip_dir=$(dirname $trip)
    for entry in $(find ${trip_dir}/entries -name "*.yaml"); do
        echo $entry
        cat $entry >> $output_file
    done
done

