#!/usr/bin/python


import argparse
import logging
import os
import sys


def shutdown():
    logging.info('Shutting down')
    sys.exit(1)


def conf_path(path):
    if os.path.isdir(path):
        return path
    else:
        raise argparse.ArgumentTypeError(f"readable_dir:{path} is not a valid path")
def parse_arguments():
    parser = argparse.ArgumentParser(
        description='this test app main in python args .', 
        prog='main'
    )
    parser.add_argument('-d', '--data', type=conf_path, help='load your data in app main')
    return parser.parse_args()

def main():
        
    args = parse_arguments()

    log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s '
    
    logging.StreamHandler()
    logging.basicConfig(
        level=logging.DEBUG, 
        encoding='utf-8', 
        format=log_format,
        datefmt='%d/%m/%Y %I:%M:%S %p'
    )
    
    logging.info('Starting server...')
            
if __name__ == '__main__':
   main()