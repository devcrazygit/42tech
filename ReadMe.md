# Hierachy Sort

## Running Locally
Please run the following to install node packages.

```
> npm i
```

And Command format is like this

```
node index.js [csv_file_path] [sort_metric]
```

For example, your input file is "input/data-big-input.csv" and sort by "net_sales_unit", then

```
node index.js input/data-big-input.csv net_sales_units
```

This will output the result to the file "output.csv"

So you can check the result in "output.csv"

`data-big-output.csv` is the result of "net_sales_unit" sorted from `data-big-input.csv`
