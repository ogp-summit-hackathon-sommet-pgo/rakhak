import pandas as pd
import numpy as np

column_data = ["packed",
            "highway",
            "greennopop",
            "water",
            "road",
            "density"
]
testing_df = pd.read_csv('testing.csv', names=column_data, index_col=None)
test_x = testing_df[["packed", 
                    "highway", 
                    "greennopop", 
                    "water", 
                    "road"]]
test_x = test_x.to_numpy()
test_x = np.reshape(
        test_x, (
        test_x.shape[0],
        1,
        test_x.shape[1]
        )
    )