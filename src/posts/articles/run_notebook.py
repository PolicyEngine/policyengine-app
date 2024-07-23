# import nbformat
# from nbconvert.preprocessors import ExecutePreprocessor
# import sys, json

# def run_notebook(notebook_path, output_json_path):
#     # Load the notebook
#     with open(notebook_path, 'r', encoding='utf-8') as f:
#         notebook = nbformat.read(f, as_version=4)

#     # Execute the notebook
#     ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
#     ep.preprocess(notebook, {'metadata': {'path': './'}})

#     # Search for the output.json content in the notebook's outputs
#     output_data = None
#     for cell in notebook.cells:
#         if cell.cell_type == 'code':
#             for output in cell.outputs:
#                 if output.output_type == 'stream' and output.name == 'stdout':
#                     try:
#                         # Attempt to parse any JSON data in stdout
#                         json_data = json.loads(output.text)
#                         output_data = json_data
#                         break
#                     except ValueError:
#                         continue
#             if output_data:
#                 break

#     if output_data is None:
#         raise ValueError("No JSON output found in the notebook execution")

#     # Save the captured output to the desired output JSON path
#     with open(output_json_path, 'w') as json_file:
#         json.dump(output_data, json_file, indent=4)

# if __name__ == "__main__":
#     if len(sys.argv) != 3:
#         print("Usage: python run_notebook.py <notebook_path> <output_json_path>")
#         sys.exit(1)

#     notebook_path = sys.argv[1]
#     output_json_path = sys.argv[2]
#     print("running notebook", notebook_path, "and saving output to", output_json_path)
#     run_notebook(notebook_path, output_json_path)
#     print("done")


# import nbformat
# from nbconvert.preprocessors import ExecutePreprocessor
# import os

# def execute_notebook(notebook_path):
#     with open(notebook_path, 'r', encoding='utf-8') as f:
#         nb = nbformat.read(f, as_version=4)
    
#     ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
#     ep.preprocess(nb, {'metadata': {'path': os.path.dirname(notebook_path)}})
    
#     with open(notebook_path, 'w', encoding='utf-8') as f:
#         nbformat.write(nb, f)

# if __name__ == '__main__':
#     notebooks_dir = 'path/to/your/notebooks'  # Change this to your notebooks directory
#     for notebook_filename in os.listdir(notebooks_dir):
#         if notebook_filename.endswith('.ipynb'):
#             execute_notebook(os.path.join(notebooks_dir, notebook_filename))
#             print(f"Executed notebook: {notebook_filename}")

import nbformat
from nbconvert.preprocessors import ExecutePreprocessor
import os
import sys  # Import sys to read command line arguments
import time  # Import time to measure execution time

def execute_notebook(notebook_path):
    with open(notebook_path, 'r', encoding='utf-8') as f:
        nb = nbformat.read(f, as_version=4)
    
    ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
    
    start_time = time.time()  # Start timer
    ep.preprocess(nb, {'metadata': {'path': os.path.dirname(notebook_path)}})
    end_time = time.time()  # End timer
    
    with open(notebook_path, 'w', encoding='utf-8') as f:
        nbformat.write(nb, f)
    
    return end_time - start_time  # Return execution time

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python run_notebook.py <notebook_name.ipynb>")
        sys.exit(1)
    
    notebooks_dir = os.getcwd()  # Use the current working directory
    notebook_name = sys.argv[1]  # The first argument is now the notebook name

    notebook_path = os.path.join(notebooks_dir, notebook_name)
    if os.path.exists(notebook_path) and notebook_name.endswith('.ipynb'):
        print(f"Executing notebook: {notebook_name}")
        execution_time = execute_notebook(notebook_path)
        print(f"Executed notebook: {notebook_name} in {execution_time:.2f} seconds")
    else:
        print(f"Notebook {notebook_name} not found in {notebooks_dir}.")