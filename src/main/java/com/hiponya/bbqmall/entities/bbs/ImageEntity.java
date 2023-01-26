package com.hiponya.bbqmall.entities.bbs;

public class ImageEntity {



    private int index;
    private String fileName;
    private String fileMime;

    public void setData(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }

    private byte[] data;


    public int getIndex() {
        return index;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileMime() {
        return fileMime;
    }


    public void setIndex(int index) {
        this.index = index;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileMime(String fileMime) {
        this.fileMime = fileMime;
    }


    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
