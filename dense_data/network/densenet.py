import pandas as pd
import keras
from keras.layers import Dense as dense
from keras.models import Sequential as seq
from keras.layers import LSTM as lstm
from keras.layers import Flatten as flatten
from keras.layers import Activation as act
from keras import backend as K
from keras import optimizers
import matplotlib.pyplot as plt
import numpy as np

# To do -> Configure LSTM prediction tools


class algorithm():

    def __init__(self):
        column_data = ["packed",
                        "highway",
                        "greennopop",
                        "water",
                        "road",
                        "density"
                    ]
        data = pd.read_csv('tagged_data.csv', 
                        index_col=None, 
                        names=column_data
                    )
        self.x_data = data[["packed", 
                            "highway", 
                            "greennopop", 
                            "water", 
                            "road"]
                        ]
        self.y_data = data["density"]
    def converter(self):
        x_axis_data = self.x_data.to_numpy()
        y_axix_data = self.y_data.to_numpy()
        x_axis_data = np.reshape(
            x_axis_data, (
                x_axis_data.shape[0],
                1,
                x_axis_data.shape[1]
            )
        )
        return y_axix_data, x_axis_data

    def lstm_algorithm(self):
        y_data, x_data = self.converter()
        
        model = seq()
        model.add(lstm(
            200,
            return_sequences=True,
            activation='relu',
            input_shape=(x_data.shape[1], 
                            x_data.shape[2], 
                            ),
                        ))
        model.add(flatten())
        model.add(dense(
            1,
            activation='sigmoid'
        ))
        sgd = optimizers.SGD(
            lr=0.01,
            momentum=0.1,
            decay=1e-5
        )
        model.compile(
            optimizer=sgd,
            loss="mean_squared_logarithmic_error"
        )
        history = model.fit(
            x_data,
            y_data,
            verbose=1,
            validation_split=0.1,
            epochs=1000,
            batch_size=200,
        )

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
        predicts = model.predict(test_x)
        print(predicts)
        for prediction in predicts:
            if prediction < 2.2:
                print("Low Density")
            elif prediction > 2.2:
                print("High Density")
        plt.plot(history.history['loss'])
        plt.show()


if __name__=="__main__":
    algorithm().lstm_algorithm()