from sklearn import tree
import pandas as pd
from subprocess import call
from sklearn.tree import export_graphviz
import pydotplus

column_data = ["General",
                "Highway",
                "Greenspaces",
                "Water",
                "Road",
                "Density"
            ]
data = pd.read_csv('high_den.csv', 
                index_col=None, 
                names=column_data
            )
x_data = data[["General", 
                "Highway", 
                "Greenspaces", 
                "Water", 
                "Road"]
                ]
y_data = data["Density"]
dtree = tree.DecisionTreeClassifier()
dtree.fit(x_data, y_data)
export_graphviz(dtree, out_file='tree.dot', 
                feature_names = column_data[:5],
                class_names=["City", "Uninhabited", "Town"],
                rounded = True, proportion = False, 
                precision = 2, filled = True)
call(['dot', '-Tpng', 'tree.dot', '-o', 'tree.png', '-Gdpi=600'])