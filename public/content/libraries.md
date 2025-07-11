# 📊 Common Python Imports for Machine Learning Projects

This markdown document includes the most frequent and essential Python imports for developing, training, evaluating, and visualizing machine learning models using libraries like `numpy`, `pandas`, `matplotlib`, and `scikit-learn`.

---

## 🔢 Numpy & Pandas (Data Handling)

```python
import numpy as np
import pandas as pd
```

---

## 📈 Matplotlib (Visualization)

### Most Used from `matplotlib.pyplot`:

```python
import matplotlib.pyplot as plt
%matplotlib inline  # For Jupyter Notebooks
```

### Common Plotting Functions:

```python
plt.scatter(x, y)
plt.plot(x, y)
plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('Title')
plt.legend()
plt.show()
```

---

## 🧠 Scikit-learn (Modeling, Preprocessing, Evaluation)

### 📂 Data Splitting

```python
from sklearn.model_selection import train_test_split
```

### 🧑‍🤖 Model Imports

```python
from sklearn.linear_model import LinearRegression, LogisticRegression, Ridge, Lasso
from sklearn.svm import SVR, SVC
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
```

### 🔍 Preprocessing & Feature Engineering

```python
from sklearn.preprocessing import StandardScaler, PolynomialFeatures, LabelEncoder
```

### ⚖️ Evaluation Metrics

```python
from sklearn.metrics import (
    mean_squared_error, mean_absolute_error, r2_score,
    accuracy_score, confusion_matrix, classification_report,
    precision_score, recall_score, f1_score
)
```

### 🔎 Model Validation

```python
from sklearn.model_selection import cross_val_score, GridSearchCV
```

---

## ⚙️ Advanced Utilities

### 🧬 Dimensionality Reduction

```python
from sklearn.decomposition import PCA
```

### 📊 Clustering

```python
from sklearn.cluster import KMeans
```

---

## 🌐 Seaborn (Optional - For Stylish Visualizations)

```python
import seaborn as sns
sns.set_style('whitegrid')
```

---

## 🧪 Sample ML Workflow with Key Imports

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Load data
df = pd.read_csv("data.csv")
X = df[['feature1', 'feature2']]
y = df['target']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, y_pred))
print("R^2:", r2_score(y_test, y_pred))

# Plot results
plt.scatter(X_test['feature1'], y_test, color='blue')
plt.plot(X_test['feature1'], y_pred, color='red')
plt.show()
```

---

### ✅ This reference helps you set up and streamline any ML project quickly with clean and reusable import patterns.
