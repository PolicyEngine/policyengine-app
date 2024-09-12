import nbformat
from nbconvert.preprocessors import ExecutePreprocessor
import os
import sys  # Import sys to read command line arguments
import time  # Import time to measure execution time


def execute_notebook(notebook_path):
    with open(notebook_path, "r", encoding="utf-8") as f:
        nb = nbformat.read(f, as_version=4)

    ep = ExecutePreprocessor(timeout=600, kernel_name="python3")

    start_time = time.time()  # Start timer
    ep.preprocess(nb, {"metadata": {"path": os.path.dirname(notebook_path)}})
    end_time = time.time()  # End timer

    with open(notebook_path, "w", encoding="utf-8") as f:
        nbformat.write(nb, f)

    return end_time - start_time  # Return execution time


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python run_notebook.py <notebook_name.ipynb>")
        sys.exit(1)

    notebooks_dir = os.getcwd()  # Use the current working directory
    notebook_name = sys.argv[1]  # The first argument is now the notebook name

    notebook_path = os.path.join(notebooks_dir, notebook_name)
    if os.path.exists(notebook_path) and notebook_name.endswith(".ipynb"):
        print(f"Executing notebook: {notebook_name}")
        execution_time = execute_notebook(notebook_path)
        print(
            f"Executed notebook: {notebook_name} in {execution_time:.2f} seconds"
        )
    else:
        print(f"Notebook {notebook_name} not found in {notebooks_dir}.")
