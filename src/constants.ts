
export class Constants {

    //public static apiURL: string = "https://itsolutionstuff.com/";

    public static NUM_ROWS: number = 20;
    public static NUM_COLUMNS: number = 20;
    public static VIEW_WIDTH: number = 7;
    public static VIEW_HEIGHT: number = 7;
    public static DISPLACEMENT: number = Math.floor(Constants.VIEW_WIDTH / 2);


    // get starting square
    public static SX = Math.floor(Constants.NUM_ROWS / 2);
    public static SY = Math.floor(Constants.NUM_COLUMNS / 2);

    // quota of number of nodes to create
    //public static QUOTA = (Constants.NUM_ROWS * Constants.NUM_COLUMNS) / 6;
    public static QUOTA = Math.floor((Constants.NUM_ROWS * Constants.NUM_COLUMNS)/10);

    public static seed: number = 4000;
    public static seed_use: number = Constants.seed;


    // events
    public static NUM_1s: number = 30;
    public static NUM_2s: number = 20;
    public static NUM_3s: number = 10;
    public static NUM_4s: number = 0;
    public static NUM_5s: number = 0;
    public static NUM_6s: number = 0;
    public static NUM_7s: number = 0;
    public static NUM_8s: number = 0;

    // player starting stats
    public static STARTING_WALK: number = 250;
    public static STARTING_MEET: number = 100
    
}