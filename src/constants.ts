
export class Constants {

    //public static apiURL: string = "https://itsolutionstuff.com/";

    public static NUM_ROWS: number = 10;
    public static NUM_COLUMNS: number = 10;
    public static VIEW_WIDTH: number = 5;
    public static VIEW_HEIGHT: number = 5;


    // get starting square
    public static SX = Math.floor(Constants.NUM_ROWS / 2);
    public static SY = Math.floor(Constants.NUM_COLUMNS / 2);

    // quota of number of nodes to create
    //public static QUOTA = (Constants.NUM_ROWS * Constants.NUM_COLUMNS) / 6;
    public static QUOTA = Math.floor((Constants.NUM_ROWS * Constants.NUM_COLUMNS)/6);

    public static seed: number = 400;
    public static seed_use: number = Constants.seed;
    
}